export function CardHead({ en, ko }: { en: string; ko: string }) {
  return (
    <header className="card-head">
      <em>{en}</em>
      <span>{ko}</span>
    </header>
  );
}
