export const User = ({
  name,
  checked,
  setChecked,
  handleClick,
}: {
  name: string;
  checked: boolean;
  handleClick: () => void;
  setChecked: () => void;
}) => {
  return (
    <label
      className={`user-filter ${checked ? 'user-filter--checked' : ''}`}
      htmlFor='checked'
      style={{ paddingBottom: '0.3rem', cursor: 'pointer' }}
      onClick={handleClick}
    >
      <input
        type='checkbox'
        name={name}
        checked={checked}
        onChange={setChecked}
      />
      <p>{name}</p>
    </label>
  );
};
