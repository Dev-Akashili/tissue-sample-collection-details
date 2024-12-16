import HyperText from "@/components/ui/hyper-text";

export default function Loading() {
  return (
    <div className="h-[80vh] flex justify-center items-center">
      <HyperText
        text="Loading..."
        duration={100}
        className="tracking-tighter text-4xl md:text-5xl lg:text-6xl font-semibold uppercase"
      />
    </div>
  );
}
