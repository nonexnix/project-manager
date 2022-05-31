import Button from '../button/button'

interface IProps {
  inputLabel: string
  inputType: string
  onChange: any
  btnLabel: string
  defaultText: string
  btnHandler: any
}
const EditTextField = ({
  inputLabel,
  inputType,
  onChange,
  btnLabel,
  defaultText,
  btnHandler,
}: IProps) => {
  return (
    <div className="grid gap-3">
      <h1 className="text-sm tracking-wide text-gray-500">
        {inputLabel}
      </h1>

      {inputType === 'input' ? (
        <div className="grid grid-cols-[1fr,auto] items-center gap-10">
          <input
            type="text"
            className="bg-white py-3 pl-6 outline-none"
            onChange={onChange}
            defaultValue={defaultText}
          />
          <Button name={btnLabel} color={'bg-blue'} handler={btnHandler} />
        </div>
      ) : (
        <div className="grid grid-cols-[1fr,auto] items-center gap-10">
          <textarea
            className="bg-white py-3 pl-6 outline-none"
            onChange={onChange}
            defaultValue={defaultText}
          />
          <button
            className={
              'bg-blue py-2 px-4 text-white font-medium cursor-pointer text-sm md:text-md rounded-md hover:scale-105 transition-all duration-300 whitespace-nowrap'
            }
            onClick={btnHandler}
          >
            {btnLabel}
          </button>
        </div>
      )}
    </div>
  )
}

export default EditTextField
