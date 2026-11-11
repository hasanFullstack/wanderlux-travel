import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — visas, flights, hotels and car rentals`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Hero photo as a data URL. Cached so the image can be prerendered at build. */
async function getHeroPhoto() {
  "use cache";
  const photo = await readFile(join(process.cwd(), "public/images/hero/hero-mountains.jpg"));
  return `data:image/jpeg;base64,${photo.toString("base64")}`;
}

/** Social share card, generated at build time from the hero photo. */
export default async function OpengraphImage() {
  const photoSrc = await getHeroPhoto();
  const services = ["Visa Services", "Flight Tickets", "Hotel Booking", "Car Rental"];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", backgroundColor: "#08131f" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
        <img
          src={photoSrc}
          alt=""
          width={1200}
          height={630}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(90deg, rgba(8,19,31,0.96) 0%, rgba(8,19,31,0.8) 50%, rgba(8,19,31,0.35) 100%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                border: "2px solid #ecbf56",
                background: "linear-gradient(135deg, #1f4766, #08131f)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="34" height="34" viewBox="0 0 24 24">
                <path d="M12 2.5 14.6 9.4 21.5 12l-6.9 2.6L12 21.5l-2.6-6.9L2.5 12l6.9-2.6L12 2.5Z" fill="#ecbf56" />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "white", fontSize: 34, fontWeight: 700 }}>Wanderlux</span>
              <span style={{ color: "#ecbf56", fontSize: 16, letterSpacing: 8 }}>TRAVEL</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
            <span style={{ color: "white", fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
              Explore the world, beautifully handled.
            </span>
            <span style={{ color: "#c3d1df", fontSize: 28, marginTop: 20 }}>Planned by experts, booked in minutes — from Lahore to anywhere.</span>
          </div>

          <div style={{ display: "flex", gap: 14 }}>
            {services.map((s) => (
              <span
                key={s}
                style={{
                  color: "white",
                  fontSize: 22,
                  padding: "10px 22px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.3)",
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
