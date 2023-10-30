import { useFormatCurrency } from "../../common/useFormatCurrency";

export const ResumeView = (props: { total: number; data: string }) => {
  const { formatCurrency } = useFormatCurrency();

  return (
    <div className="p-4 font-medium flex gap-4 w-full bg-slate-100">
      <span>Total do Orçamento:</span>
      <span>{formatCurrency(props.total)}</span>
    </div>
  );
};
