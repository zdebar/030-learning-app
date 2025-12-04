type StepProps = {
  step: {
    operation: string;
    points: number;
    steps: string[];
    ["steps-hidden"]?: string[];
  };
};

export default function Step({ step }: StepProps) {
  return (
    <div className="mb-4 p-3 border rounded bg-gray-50">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">Operace: {step.operation}</span>
        <span className="text-xs text-gray-500">Body: {step.points}</span>
      </div>
      <div className="mb-1">
        <span className="font-bold">Kroky:</span>
        <ul className="list-disc ml-6">
          {step.steps.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ul>
      </div>
      {step["steps-hidden"] && step["steps-hidden"].length > 0 && (
        <div className="mb-1">
          <span className="font-bold">Skryté kroky:</span>
          <ul className="list-disc ml-6 text-gray-400">
            {step["steps-hidden"].map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
