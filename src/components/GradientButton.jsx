function GradientButton({ title, className, onClick }) {
  return (
    <button
      onClick={() => onClick()}
      className={`bg-gradient-to-r from-[#0071C7] from-10% via-[#960000] via-50%  to-[#960000] to-90% rounded-full text-2xl   border-[3px]  border-white  text-center tracking-[0.72px] font-RiftSoft text-white   ${className}`}
    >
      {title}
    </button>
  );
}

export default GradientButton;
