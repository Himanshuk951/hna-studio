// TEMPORARY placeholder visual.
// Replace usages of this component with real NOIR & BEAN screenshots
// (e.g. via next/image pointing at /public/work/noir-and-bean/*.jpg)
// as soon as real screenshots exist. Kept as CSS so the homepage and
// case study aren't blocked on final assets.

const cream = "#F3ECE1";
const ink = "#2B2117";
const rust = "#B5563C";
const line = "#DED2BE";

type Variant = "hero" | "menu" | "reserve";

export default function NoirBeanMockup({ variant = "hero" }: { variant?: Variant }) {
  return (
    <div
      className="mockup-scale"
      style={{
        background: cream,
        color: ink,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      {/* fake browser chrome so it reads as a "screenshot" */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 16px",
          borderBottom: `1px solid ${line}`,
          fontFamily: "monospace",
          fontSize: 11,
          color: "#8a7c68",
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: rust }} />
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: line }} />
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: line }} />
        <span style={{ marginLeft: 8 }}>noirandbean.co</span>
      </div>

      <div style={{ flex: 1, padding: "clamp(16px,4%,40px)", position: "relative", overflow: "hidden" }}>
        {variant === "hero" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 700, letterSpacing: "0.04em", fontSize: "clamp(12px,1.4vw,16px)" }}>
                NOIR &amp; BEAN
              </div>
              <div style={{ display: "flex", gap: 18, fontSize: "clamp(9px,1vw,12px)", color: "#6b5d49" }}>
                <span>Menu</span>
                <span>Visit</span>
                <span>Reserve</span>
              </div>
            </div>
            <div style={{ marginTop: "8%" }}>
              <div
                style={{
                  fontSize: "clamp(20px,4.2vw,44px)",
                  lineHeight: 1.08,
                  maxWidth: "70%",
                }}
              >
                Slow mornings,
                <br />
                deserved.
              </div>
              <div style={{ fontSize: "clamp(9px,1vw,13px)", color: "#6b5d49", marginTop: 14, maxWidth: "50%" }}>
                Specialty coffee and quiet corners, in the middle of the city.
              </div>
              <div
                style={{
                  marginTop: 20,
                  display: "inline-block",
                  background: rust,
                  color: cream,
                  padding: "clamp(6px,0.9vw,12px) clamp(12px,1.6vw,22px)",
                  fontSize: "clamp(8px,0.9vw,12px)",
                  letterSpacing: "0.04em",
                }}
              >
                Reserve a table
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                right: "6%",
                bottom: "8%",
                width: "clamp(40px,9vw,110px)",
                height: "clamp(40px,9vw,110px)",
                borderRadius: "50%",
                border: `2px solid ${rust}`,
                opacity: 0.5,
              }}
            />
          </>
        )}

        {variant === "menu" && (
          <>
            <div style={{ fontSize: "clamp(16px,2.6vw,28px)", marginBottom: "6%" }}>The Menu</div>
            {[
              ["Cortado", "₹210"],
              ["Pour Over — Single Origin", "₹340"],
              ["Cardamom Cold Brew", "₹290"],
              ["Burnt Butter Croissant", "₹180"],
            ].map(([item, price]) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "clamp(9px,1.1vw,14px)",
                  color: "#4a3d2c",
                  padding: "clamp(6px,1vw,12px) 0",
                  borderBottom: `1px dotted ${line}`,
                }}
              >
                <span>{item}</span>
                <span>{price}</span>
              </div>
            ))}
          </>
        )}

        {variant === "reserve" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "100%", gap: "6%" }}>
            <div
              style={{
                background: ink,
                color: cream,
                padding: "clamp(10px,2vw,22px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: "clamp(13px,2vw,22px)", marginBottom: 14 }}>Reserve your table</div>
              {["Name", "Date", "Party size"].map((f) => (
                <div
                  key={f}
                  style={{
                    fontFamily: "monospace",
                    fontSize: "clamp(7px,0.8vw,11px)",
                    color: "#c9bfa9",
                    borderBottom: "1px solid #4a3d2c",
                    padding: "clamp(5px,0.8vw,9px) 0",
                    marginBottom: 6,
                  }}
                >
                  {f}
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                fontSize: "clamp(8px,1vw,12px)",
                color: "#6b5d49",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 6, color: ink }}>Visit</div>
              <div>123 Fountain Lane</div>
              <div style={{ marginTop: 10, fontWeight: 700, color: ink }}>Hours</div>
              <div>Mon–Sun · 8am – 7pm</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
