import './buttonCustom.css';

export const ButtonCustom = ({
  onClick,
  label = 'Valider',
}: {
  onClick: () => void;
  label?: string;
}) => {
  return (
    <button className='buttonCustom' onClick={onClick}>
      {label}
    </button>
  );
};
