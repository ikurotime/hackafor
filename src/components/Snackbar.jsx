import useStore from '../../store'

export default function Snackbar() {
  const error = useStore((state) => state.error)
  return error ? (
    <div className='absolute bottom-10 text-xs p-3 bg-red-500 mx-auto left-0 right-0 w-fit  '>
      {error}
    </div>
  ) : null
}
