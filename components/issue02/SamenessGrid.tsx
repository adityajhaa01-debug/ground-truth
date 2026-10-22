import React from "react";

export function SamenessGrid() {
  const snippets = [
    {
      text: '"The onboarding was seamless and the support team was incredibly responsive."',
      author: "Daniel R., COO",
      isRaw: false,
    },
    {
      text: '"This platform completely transformed how our team collaborates. Highly recommend."',
      author: "Neha S., Marketing Lead",
      isRaw: false,
    },
    {
      text: '"We saw significant improvements in efficiency within weeks. A game-changer."',
      author: "Kavya I., Founder",
      isRaw: false,
    },
    {
      text: '"Powerful features, intuitive design, and real ROI. Exactly what we needed."',
      author: "Marcus T., VP Sales",
      isRaw: false,
    },
    {
      // The single raw, specific voice in full color
      text: '"The Monday ops report started landing before our 9 a.m. standup instead of after lunch, and Priya just stopped complaining."',
      author: "Arjun M., Head of Ops",
      isRaw: true,
    },
    {
      text: '"It empowered our team to focus on what matters most. Couldn\'t be happier."',
      author: "Ishaan P., Head of Growth",
      isRaw: false,
    },
    {
      text: '"Driving measurable operational excellence and alignment across every division."',
      author: "Sarah L., Director",
      isRaw: false,
    },
    {
      text: '"Streamlined our core workflows and delivered undeniable organizational value."',
      author: "David K., VP Product",
      isRaw: false,
    },
    {
      text: '"A robust, transformative solution that maximized team productivity from day one."',
      author: "Elena M., Strategy Lead",
      isRaw: false,
    },
  ];

  return (
    <figure
      aria-labelledby="sameness-caption"
      className="my-10 border border-hairline bg-paper p-4 sm:p-6 rounded-[2px]"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {snippets.map((s, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-[2px] transition-all flex flex-col justify-between text-xs leading-relaxed ${
              s.isRaw
                ? "bg-white border-2 border-primaryPurple shadow-sm"
                : "bg-white/60 border border-hairline text-muted"
            }`}
          >
            <p
              className={`font-body text-[13px] ${
                s.isRaw ? "text-ink font-medium" : "text-muted italic"
              }`}
            >
              {s.text}
            </p>
            <div className="mt-3 pt-2 border-t border-hairline flex items-center justify-between font-mono text-[10px]">
              <span className={s.isRaw ? "text-deepPurple font-semibold" : "text-muted"}>
                {s.author}
              </span>
              {s.isRaw ? (
                <span className="bg-lilacTint text-deepPurple px-1.5 py-0.5 rounded-[1px] uppercase tracking-wider font-bold">
                  Raw Voice
                </span>
              ) : (
                <span className="text-muted/60 uppercase">AI-Polished</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <figcaption
        id="sameness-caption"
        className="mt-4 pt-3 border-t border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono text-[11px] text-muted"
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold text-ink">FIGURE 01 // THE SAMENESS PROBLEM</span>
          <span>Nine customers. One voice. Spot the person.</span>
        </div>
        <span>Illustrative example. Fictional customers, not client data.</span>
      </figcaption>
    </figure>
  );
}
