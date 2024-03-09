import { FC } from "react";

type Props = {
  color: string;
}

// ローディング
const Loading: FC<Props> = (props) => {
  const { color } = props;

  return (
    <div className="flex justify-center">
      <div className={`h-10 w-10 animate-spin rounded-full border-4 border-${color}-500 border-t-transparent`} />
    </div>
  );
};

export default Loading;
