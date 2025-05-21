import Logo from '@/assets/logo.svg?react';

function Footer() {
  return (
    <footer
      id="footer"
      className="mw-1280 flex justify-between border-t border-[#B7B7B7] pt-4 pb-28 md:pt-5 md:pb-32"
    >
      <Logo className="h-5 w-auto md:h-7" />
      <p className="text-independent text-sm">
        최신 업데이트
        <br />
        2025.05.21
      </p>
    </footer>
  );
}

export default Footer;
