import { IApodData } from "../types";

interface Props {
  data: Nullable<IApodData>;
}

export default function Main(props: Props) {
  const { data } = props;

  return (
    <div className="imgContainer">
      <img src={data?.hdurl} alt={data?.title || ""} className="bgImage" />
    </div>
  );
}
