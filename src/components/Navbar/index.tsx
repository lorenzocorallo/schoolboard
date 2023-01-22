import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

// import HomeSvg from '../../assets/img/HomeSvg';
// import ExamSvg from '../../assets/img/ExamSvg';
// import CopySvg from '../../assets/img/CopySvg';
// import PushPinSvg from '../../assets/img/PushPinSvg';

const navItems = [
    {
        name: 'Home',
        icon: <></>,
        slug: 'home',
    },
    {
        name: 'Voti',
        icon: <></>,
        slug: 'marks',
    },
    {
        name: 'Compiti',
        icon: <></>,
        slug: 'homeworks',
    },
    {
        name: 'Promemoria',
        icon: <></>,
        slug: 'memos',
    },
];

const Navbar = () => {
    const { pathname } = useLocation();
    const activeBoxRef = useRef(null);
    const buttonsRef = useRef([] as HTMLAnchorElement[]);
    buttonsRef.current = [] as HTMLAnchorElement[];

    const addToRef = (el: HTMLAnchorElement | null) => {
        if (el && !buttonsRef.current.includes(el)) {
            buttonsRef.current.push(el);
        }
    };
    /* GSAP to be implemented later on
    useEffect(() => {
        const activeIndex = navItems.findIndex(
            (item) => pathname.split('/')[1] === item.slug
        );
        const top = `${2.5 + 6.4 * activeIndex + 8 * activeIndex}rem`;
        const activeItem = buttonsRef.current[activeIndex];
        const inactiveItems = buttonsRef.current.filter((el) => el !== activeItem);

          if (activeItem && inactiveItems && activeBoxRef.current) {
            const tl = gsap.timeline();
            tl.to(activeBoxRef.current, {
              top,
              duration: 0.3,
            }).to(
              activeItem.querySelectorAll('svg path'),
              {
                fill: '#FFAE50',
                duration: 0.2,
              },
              '-=0.2'
            );
            inactiveItems.map((el) =>
              gsap.to(el.querySelectorAll('svg path'), {
                fill: '#C4C4C4',
                duration: 0.3,
              })
            );
          }
    }, [pathname, activeBoxRef]);
    */

    return (
        <div className='h-full flex basis-52 p-2 flex-col justify-center items-center select-none'>
            <nav className='pt-10 flex flex-col items-center relative'>
                <div className='w-32 h-32 rounded-[20%] absolute -z-20 bg-red-200 t-0 l-0' ref={activeBoxRef} />
                {navItems.map((item) => (
                    <Link
                        style={{
                            marginBottom: '6.4rem',
                        }}
                        key={`nav-${item.name}`}
                        ref={(e) => addToRef(e)}
                        to={`/${item.slug}`}
                    >
                        <button className='w-32 h-32 flex border-none justify-center items-center rounded-[20%] bg-transparent z-30' aria-label={item.name} type="button">
                            {item.icon}
                        </button>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Navbar;
