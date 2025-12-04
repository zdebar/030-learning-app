type ExplanationProps = {
  content: {
    html?: string;
  };
};

export default function Explanation({ content }: ExplanationProps) {
  if (!content) return null;

  return (
    <section>
      {content?.html && (
        <div dangerouslySetInnerHTML={{ __html: content.html }} />
      )}
    </section>
  );
}
