import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

//======================================Shiny Background
export const ShinyButton = ({ ...props }) => {
  const shinyButtonStyles = {
    animation: "bg-shine 2.1s linear infinite",
    backgroundSize: "200% 100%",
  };

  const keyframes = `
    @keyframes bg-shine {
      from {
        background-position: 0 0;
      }
      to {
        background-position: -200% 0;
      }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <Button
        {...props}
        style={shinyButtonStyles}
        className={cn(
          "duration-[2200ms] rounded-lg border-[1px] tracking-wide shadow",
          "dark:border-zinc-800 dark:bg-[linear-gradient(110deg,#2A2A2A,45%,#3f3f41,55%,#2A2A2A)] dark:text-zinc-200",
          "border-zinc-300 bg-[linear-gradient(110deg,#FFF,45%,#E4E4E7,55%,#FFF)] text-zinc-800",
          props.className,
        )}
      />
    </>
  );
};
