"use client";

import { useState } from "react";
import { Input, Button } from "@/components/ui";

function reduceToSingle(num: number): number {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = String(num)
      .split("")
      .reduce((sum, d) => sum + parseInt(d), 0);
  }
  return num;
}

function calculateLifePath(day: number, month: number, year: number): number {
  const sum = String(day).split("").reduce((s, d) => s + parseInt(d), 0)
    + String(month).split("").reduce((s, d) => s + parseInt(d), 0)
    + String(year).split("").reduce((s, d) => s + parseInt(d), 0);
  return reduceToSingle(sum);
}

function calculateDestiny(name: string): number {
  const letterValues: Record<string, number> = {
    a: 1, b: 2, c: 3, č: 3, ć: 3, d: 4, đ: 4, e: 5, f: 6, g: 7, h: 8,
    i: 9, j: 1, k: 2, l: 3, lj: 3, m: 4, n: 5, nj: 5, o: 6, p: 7,
    r: 9, s: 1, š: 1, t: 2, u: 3, v: 4, z: 8, ž: 8,
  };
  const sum = name
    .toLowerCase()
    .replace(/[^a-zčćđšž]/g, "")
    .split("")
    .reduce((s, ch) => s + (letterValues[ch] || 0), 0);
  return reduceToSingle(sum);
}

const LIFE_PATH_MEANINGS: Record<number, string> = {
  1: "Lider, nezavisan, ambiciozan. Imate prirodnu sposobnost da vodite i inspirišete druge.",
  2: "Diplomata, saradnik, osetljiv. Vaša snaga leži u sposobnosti da gradite harmoniju i partnerstva.",
  3: "Kreativan, ekspresivan, društven. Izražavate se kroz umetnost, komunikaciju i radost.",
  4: "Praktičan, stabilan, vredan. Gradite čvrste temelje za budućnost kroz rad i disciplinu.",
  5: "Avanturista, slobodan, prilagodljiv. Tražite promenu, putovanja i nova iskustva.",
  6: "Brižan, odgovoran, porodičan. Vaša misija je da služite i brinete o drugima.",
  7: "Analitičar, duhovnjak, introvert. Tražite dublje razumevanje života i skrivene istine.",
  8: "Moćan, ambiciozan, materijalno orijentisan. Imate dar za poslovanje i finansijski uspeh.",
  9: "Humanista, idealist, mudar. Vaša duša želi da služi čovečanstvu i da deli mudrost.",
  11: "Majstor broj. Vizionar i intuitivac sa dubokim duhovnim uvitima i sposobnošću da inspiriše.",
  22: "Majstor graditelj. Sposobnost da pretvori velike snove u realnost kroz praktičan rad.",
  33: "Majstor učitelj. Posvećenost služenju drugima sa neograničenom ljubavlju i saosećanjem.",
};

export function NumerologyCalculator() {
  const [name, setName] = useState("");
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [result, setResult] = useState<{
    lifePath: number;
    destiny: number;
  } | null>(null);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !day || !month || !year) return;
    setResult({
      lifePath: calculateLifePath(day, month, year),
      destiny: calculateDestiny(name),
    });
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleCalculate} className="rounded-2xl border border-border bg-surface p-6 space-y-4">
        <Input
          label="Puno ime i prezime"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Unesite vaše puno ime"
        />
        <div className="grid grid-cols-3 gap-3">
          <Input
            label="Dan"
            type="number"
            value={day || ""}
            onChange={(e) => setDay(parseInt(e.target.value) || 0)}
            min={1}
            max={31}
            placeholder="DD"
          />
          <Input
            label="Mesec"
            type="number"
            value={month || ""}
            onChange={(e) => setMonth(parseInt(e.target.value) || 0)}
            min={1}
            max={12}
            placeholder="MM"
          />
          <Input
            label="Godina"
            type="number"
            value={year || ""}
            onChange={(e) => setYear(parseInt(e.target.value) || 0)}
            min={1900}
            max={2100}
            placeholder="GGGG"
          />
        </div>
        <Button type="submit" variant="primary" size="lg" className="w-full">
          Izračunaj
        </Button>
      </form>

      {result && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="text-center">
              <span className="text-5xl font-bold text-primary">{result.lifePath}</span>
              <h3 className="mt-3 text-lg font-semibold">Broj životnog puta</h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                {LIFE_PATH_MEANINGS[result.lifePath] || "Vaš životni put je jedinstven."}
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="text-center">
              <span className="text-5xl font-bold text-secondary">{result.destiny}</span>
              <h3 className="mt-3 text-lg font-semibold">Broj sudbine</h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                {LIFE_PATH_MEANINGS[result.destiny] || "Vaša sudbina je jedinstvena."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
