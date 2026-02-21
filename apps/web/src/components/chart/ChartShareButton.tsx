"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ChartData } from "@/types";

interface ChartShareButtonProps {
  chartType: string;
  inputData: Record<string, unknown>;
  chartData: ChartData;
  svg: string;
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function ViberIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.177.543 6.673.47 9.736.399 12.799.327 18.553 5.825 20.15l.002.001v2.313s-.036.935.58 1.127c.744.232 1.181-.479 1.893-1.247.39-.422.928-1.042 1.334-1.517 3.678.31 6.508-.398 6.826-.508.733-.254 4.878-.77 5.553-6.282.697-5.676-.337-9.268-2.207-10.893l-.001-.001c-.533-.513-2.664-2.063-7.553-2.108-.184-.002-.367-.004-.548-.002l-.306-.031zm.197 1.593h.288c4.103.046 5.975 1.263 6.405 1.682 1.566 1.362 2.393 4.548 1.803 9.433-.556 4.538-3.87 4.866-4.477 5.077-.265.091-2.715.697-5.788.484 0 0-2.291 2.765-3.007 3.487-.112.113-.245.166-.333.144-.123-.032-.157-.184-.156-.406l.021-3.793c-4.591-1.336-4.32-6.3-4.262-8.722.058-2.583.664-4.673 2.1-6.09 1.933-1.773 5.494-2.145 7.406-2.296zM12.488 5.14a.428.428 0 00-.018.856c1.11.043 2.04.441 2.755 1.2.715.758 1.07 1.69 1.073 2.804a.428.428 0 10.855-.013c-.003-1.353-.467-2.515-1.372-3.474-.904-.96-2.058-1.423-3.277-1.372h-.016zm-4.253.816a1.04 1.04 0 00-.457.093l-.018.01c-.396.2-.76.485-1.073.822a2.144 2.144 0 00-.583 1.09c-.014.098-.017.196-.009.293l.013.01c.071.463.267.938.546 1.443.462.842 1.162 1.766 2.064 2.675.102.103.2.209.31.313.112.104.217.207.32.31.909.901 1.834 1.601 2.677 2.063.766.419 1.378.66 1.884.713l.04.002.06.003a1.698 1.698 0 00.38-.046 2.132 2.132 0 001.085-.582c.336-.315.622-.679.822-1.074l.008-.017c.196-.454.108-.89-.197-1.162l-.012-.008c-.57-.462-1.2-.872-1.678-1.2l-.07-.046c-.442-.295-.848-.177-1.076.095l-.478.567c-.246.29-.687.252-.687.252l-.011.003c-3.248-.875-4.15-4.154-4.15-4.154s-.038-.441.25-.688l.568-.477c.272-.228.39-.634.094-1.077-.352-.54-.831-1.244-1.327-1.811-.225-.22-.483-.334-.751-.33l.01-.036zM13.626 6.1a.428.428 0 00-.017.855 2.537 2.537 0 011.728.8c.434.48.657 1.042.66 1.713a.428.428 0 10.855-.01 3.384 3.384 0 00-.896-2.324 3.39 3.39 0 00-2.313-1.032h-.017zm-1.136.845a.429.429 0 00-.024.857c.939.05 1.505.603 1.564 1.556a.428.428 0 10.853-.056c-.08-1.285-.929-2.133-2.37-2.357a.417.417 0 00-.023 0z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const SHARE_TEXT = "Pogledaj moju natalnu kartu na AstroPut-u!";

function openShareWindow(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export function ChartShareButton({
  chartType,
  inputData,
  chartData,
  svg,
}: ChartShareButtonProps) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [shareUrl, setShareUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    setStatus("saving");
    try {
      const res = await fetch("/api/share/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chart_type: chartType,
          input_data: inputData,
          chart_data: chartData,
          svg,
        }),
      });
      if (!res.ok) throw new Error("Failed to save chart");
      const data = await res.json();
      const url = `${window.location.origin}/chart/${data.share_slug}`;
      setShareUrl(url);
      setStatus("saved");
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setStatus("error");
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (status === "saved") {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(SHARE_TEXT);

    const platforms = [
      {
        label: "Facebook",
        icon: <FacebookIcon />,
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      },
      {
        label: "X",
        icon: <XIcon />,
        href: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      },
      {
        label: "WhatsApp",
        icon: <WhatsAppIcon />,
        href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      },
      {
        label: "Viber",
        icon: <ViberIcon />,
        href: `viber://forward?text=${encodedText}%20${encodedUrl}`,
      },
      {
        label: "Telegram",
        icon: <TelegramIcon />,
        href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      },
    ];

    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4">
        <p className="text-sm font-medium text-primary">Link kopiran u clipboard!</p>
        <input
          type="text"
          readOnly
          value={shareUrl}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-center text-sm text-text-secondary"
          onClick={(e) => (e.target as HTMLInputElement).select()}
        />
        <div className="flex items-center gap-2">
          {platforms.map((p) => (
            <button
              key={p.label}
              title={p.label}
              onClick={() => openShareWindow(p.href)}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface transition-all",
                "hover:border-primary/50 hover:bg-surface-hover hover:text-primary",
              )}
            >
              {p.icon}
            </button>
          ))}
          <button
            title="Kopiraj link"
            onClick={handleCopy}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface transition-all",
              copied
                ? "border-primary/50 text-primary"
                : "hover:border-primary/50 hover:bg-surface-hover hover:text-primary",
            )}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleShare}
      disabled={status === "saving"}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-medium transition-all",
        "hover:border-primary/50 hover:bg-surface-hover hover:text-primary",
        "disabled:opacity-50 disabled:cursor-not-allowed",
      )}
    >
      {status === "saving" ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          Cuvanje...
        </>
      ) : status === "error" ? (
        "Greska - pokusajte ponovo"
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Podeli kartu
        </>
      )}
    </button>
  );
}
