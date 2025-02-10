export const loadFont = async (font) => {
  try {
    switch (font) {
      case "yekan":
        const { yekan } = await import("../app/fonts/fonts");

        return "--font-yekan";
      case "parastoo":
        const { parastoo } = await import("../app/fonts/fonts");

        return "--font-parastoo";
      case "sahel":
        const { sahel } = await import("../app/fonts/fonts");

        return "--font-sahel";
      case "samim":
        const { samim } = await import("../app/fonts/fonts");

        return "--font-samim";
      case "shabnam":
        const { shabnam } = await import("../app/fonts/fonts");

        return "--font-shabnam";
      case "tanha":
        const { tanha } = await import("../app/fonts/fonts");

        return "--font-tanha";
      case "vazir":
        const { vazir } = await import("../app/fonts/fonts");

        return "--font-vazir";
      default:
        // console.error("Font not found:", font);
        return null;
    }
  } catch (error) {
    return null;
  }
};
