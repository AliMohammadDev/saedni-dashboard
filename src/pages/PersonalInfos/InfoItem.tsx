type InfoItemProps = {
  label: string;
  value: string | number;
  isMultiline?: boolean;
};

function InfoItem({ label, value, isMultiline = false }: InfoItemProps) {
  return (
    <div className="flex flex-row justify-between items-center py-3 border-b border-green-600 last:border-none">
      <dt className="font-medium text-gray-700 w-1/3">{label}</dt>
      <dd
        className={`mt-0 text-gray-950 w-2/3 ${isMultiline ? "whitespace-pre-line" : ""}`}
      >
        {value}
      </dd>
    </div>
  );
}


export default InfoItem