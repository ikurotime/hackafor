export default function Button(props) {
  const { children, className = '' } = props
  return (
    <button
      className={
        `p-3 bg-slate-500 shadow-[0_5px] shadow-slate-600 hover:scale-105 active:shadow-none active:translate-y-1 transition-all text-white ` +
        props.className
      }
    >
      {props.children}
    </button>
  )
}
