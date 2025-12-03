type ExplanationProps = {
  explanation: {
    name: string;
    content: {
      html?: string;
    };
    updated_at?: string;
  };
};

export default function Explanation({ explanation }: ExplanationProps) {
  if (!explanation) return null;

  console.log("Rendering explanation:", explanation);

  return (
    <section>
      <h2>{explanation.name}</h2>
      {explanation.content?.html && (
        <div dangerouslySetInnerHTML={{ __html: explanation.content.html }} />
      )}
    </section>
  );
}
