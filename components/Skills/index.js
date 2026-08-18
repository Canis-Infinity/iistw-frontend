export default function Skills({ icon, content }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm text-card-foreground shadow-sm">
      <div className="text-primary [&_svg]:size-4">{icon}</div>
      <div>{content}</div>
    </div>
  );
}
