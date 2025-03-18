export default function LoadingCircle() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="w-8 h-8 border-[3px] border-t-transparent rounded-full animate-spin border-p300"></div>
    </div>
  );
}
