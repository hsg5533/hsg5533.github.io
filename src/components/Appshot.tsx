export default function Appshot({
  variant,
  shots,
}: {
  variant: "app" | "web";
  shots: { src: string; alt: string }[];
}) {
  return (
    <div className={`shots-${variant} stagger`}>
      {shots.map((shot) => (
        <div className="ph" key={shot.src}>
          <img src={shot.src} alt={shot.alt} />
        </div>
      ))}
    </div>
  );
}
