# Deployment on AWS EC2 with Amazon ECR

The deployment uses two independent images:

- `portfolio-web`: the Vite build served by unprivileged nginx on port `8080`;
- `portfolio-api`: the NestJS API running as a non-root user on port `2100`.

The Compose deployment also runs PostgreSQL 16 and Redis 7. Their data is
stored in the persistent `postgres_data` and `redis_data` Docker volumes.

## Automatic publishing with GitHub Actions

The workflow in `.github/workflows/push-images-to-ecr.yaml` runs after every
push to `main` and can also be started manually. It publishes both images with
the `latest` tag and the full Git commit SHA.

GitHub connects to AWS through OIDC. Do not create long-lived AWS access keys
for GitHub.

### Create the ECR repositories

```bash
aws ecr create-repository \
  --repository-name portfolio/web \
  --image-scanning-configuration scanOnPush=true \
  --region eu-central-1

aws ecr create-repository \
  --repository-name portfolio/api \
  --image-scanning-configuration scanOnPush=true \
  --region eu-central-1
```

### Add the GitHub OIDC provider to AWS

In AWS Console, open **IAM > Identity providers > Add provider**:

- provider type: `OpenID Connect`;
- provider URL: `https://token.actions.githubusercontent.com`;
- audience: `sts.amazonaws.com`.

Only one GitHub OIDC provider is needed per AWS account. Skip this step if it
already exists.

### Create the GitHub Actions IAM role

Create an IAM role with **Web identity** as its trusted entity and select the
GitHub OIDC provider. Use
`deploy/aws/github-actions-trust-policy.example.json` as its trust policy after
replacing `<AWS_ACCOUNT_ID>`.

The trust policy is intentionally restricted to:

```text
repo:Pieselak/React-NestJS-AboutMe:ref:refs/heads/main
```

Attach an inline permissions policy based on
`deploy/aws/github-actions-ecr-policy.example.json`. Replace `<AWS_REGION>` and
`<AWS_ACCOUNT_ID>`. It permits pushes only to the two portfolio repositories.

Copy the resulting role ARN. It will look like:

```text
arn:aws:iam::123456789012:role/github-actions-portfolio-ecr
```

### Configure GitHub repository variables

Open **Settings > Secrets and variables > Actions > Variables** in the GitHub
repository and add:

| Variable | Example |
| --- | --- |
| `AWS_REGION` | `eu-central-1` |
| `AWS_ROLE_ARN` | `arn:aws:iam::123456789012:role/github-actions-portfolio-ecr` |
| `ECR_WEB_REPOSITORY` | `portfolio/web` |
| `ECR_API_REPOSITORY` | `portfolio/api` |
| `VITE_API_URL` | `https://api.pieselak.app` |
| `VITE_CONTACT_EMAIL` | public contact email |

The `VITE_*` values are public and compiled into the frontend bundle. Never put
secrets in variables prefixed with `VITE_`. No GitHub Actions secrets are
required for ECR authentication.

### Test the workflow

Push a commit to `main`, or open **Actions > Push Docker images to Amazon ECR >
Run workflow**. Both matrix jobs publish independently.

In Amazon ECR, each repository should contain `latest` and a commit SHA tag.
For repeatable EC2 deployments, use the SHA tag in the deploy `.env` instead of
`latest`.

## 1. Create ECR repositories

```bash
aws ecr create-repository --repository-name portfolio/web --region eu-central-1
aws ecr create-repository --repository-name portfolio/api --region eu-central-1
```

## 2. Log Docker in to ECR

```bash
aws ecr get-login-password --region eu-central-1 \
  | docker login --username AWS --password-stdin 123456789012.dkr.ecr.eu-central-1.amazonaws.com
```

Replace the account ID and region in all examples.

## 3. Build the images

Run these commands from the monorepo root. Vite variables are compiled into the
web image and cannot be changed later by Docker Compose.

```bash
docker build \
  --file apps/web/Dockerfile \
  --build-arg VITE_API_URL=https://api.example.com \
  --build-arg VITE_CONTACT_EMAIL=contact@example.com \
  --tag 123456789012.dkr.ecr.eu-central-1.amazonaws.com/portfolio/web:latest \
  .

docker build \
  --file apps/api/Dockerfile \
  --tag 123456789012.dkr.ecr.eu-central-1.amazonaws.com/portfolio/api:latest \
  .
```

Use an immutable tag such as a Git commit SHA in addition to `latest` for
repeatable deployments.

## 4. Push the images

```bash
docker push 123456789012.dkr.ecr.eu-central-1.amazonaws.com/portfolio/web:latest
docker push 123456789012.dkr.ecr.eu-central-1.amazonaws.com/portfolio/api:latest
```

## 5. Prepare EC2

Install Docker Engine, the Docker Compose plugin, and AWS CLI. Attach an EC2 IAM
role with `AmazonEC2ContainerRegistryReadOnly` so the instance can pull private
images without permanent AWS access keys.

Copy `deploy/aws/compose.yaml` and create `deploy/aws/.env` from `.env.example`.
Keep `.env` outside Git and limit access to it because it contains secrets.

Log in to ECR on the instance:

```bash
aws ecr get-login-password --region eu-central-1 \
  | docker login --username AWS --password-stdin 123456789012.dkr.ecr.eu-central-1.amazonaws.com
```

## 6. Deploy or update

From the directory containing `compose.yaml` and `.env`:

```bash
docker compose pull
docker compose up -d --remove-orphans
docker compose ps
```

To inspect logs:

```bash
docker compose logs --tail=200 api
docker compose logs --tail=200 web
```

## AWS networking

Expose only ports `80` and `443` publicly in the EC2 security group. Port `2100`
should be exposed only when an Application Load Balancer or reverse proxy needs
to reach the API. For a public API subdomain, terminate TLS at an ALB or another
reverse proxy and route `api.example.com` to port `2100`.

PostgreSQL and Redis are available only inside the Compose network. Do not add
public `ports` mappings for them. Back up the `postgres_data` volume regularly;
for higher availability and managed backups, migrate later to RDS and
ElastiCache.
