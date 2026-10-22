export function WhatsAppMessagePreview({ message }: { message: string }) {
  return (
    <div
      className="request-message grid gap-4 whitespace-normal! [&_strong]:text-[length:inherit]! [&_strong]:tracking-normal!"
      aria-label="Vista previa del mensaje"
    >
      {message.split("\n\n").map((section, sectionIndex) => (
        <p className="m-0! whitespace-pre-wrap leading-[1.75]!" key={sectionIndex}>
          {section.split(/(\*[^*\n]+\*)/g).map((part, partIndex) =>
            /^\*[^*\n]+\*$/.test(part) ? (
              <strong key={partIndex}>{part.slice(1, -1)}</strong>
            ) : (
              part
            ),
          )}
        </p>
      ))}
    </div>
  );
}
