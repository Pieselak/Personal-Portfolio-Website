import { Info } from "lucide-react";
import { getToneClasses, type Tone } from "@/app/components/ui/tone.ts";

type NoticeProps = {
  tone?: Tone;
  title?: string;
  children: string;
};

export function Notice({ tone = "gray", title, children }: NoticeProps) {
  const toneClasses = getToneClasses(tone);

  return (
    <div
      className={`flex gap-3 rounded-tile border p-4 ${toneClasses.bg} ${toneClasses.border} ${toneClasses.text}`}
    >
      <Info className="mt-0.5 size-5 shrink-0" />
      <div>
        {title && <p className="font-black">{title}</p>}
        <p className="text-sm leading-6">{children}</p>
      </div>
    </div>
  );
}
