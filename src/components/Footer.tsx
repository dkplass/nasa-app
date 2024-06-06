import { IApodData } from "../types";

interface Props {
  data: Nullable<IApodData>;
  handleToggleModal: () => void;
}

export default function Footer(props: Props) {
  const { data, handleToggleModal } = props;

  return (
    <footer>
      <div className="bgGradient"></div>
      <div>
        <h1>APOD PROJECT</h1>
        <h2>{data?.title}</h2>
      </div>
      <button onClick={handleToggleModal}>
        <i className="fa-solid fa-circle-info"></i>
      </button>
    </footer>
  );
}
