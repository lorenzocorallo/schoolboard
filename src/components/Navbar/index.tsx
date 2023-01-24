import { Link, NavLink } from 'react-router-dom';
import { IoHome, IoSchool } from 'react-icons/io5';
import { MdAssignment, MdDarkMode, MdLightMode, MdLogout, MdPushPin } from 'react-icons/md'
import Button from '../Button';
import { useContext } from 'react';
import { DarkModeContext } from '../../context/DarkMode';

const ICON_SIZE = 24;
const navItems = [
    {
        name: 'Dashboard',
        icon: <IoHome size={ICON_SIZE} />,
        slug: '/'
    },
    {
        name: 'Voti',
        icon: <IoSchool size={ICON_SIZE} />,
        slug: '/marks',
    },
    {
        name: 'Compiti',
        icon: <MdAssignment size={ICON_SIZE} />,
        slug: '/homeworks',
    },
    {
        name: 'Promemoria',
        icon: <MdPushPin size={ICON_SIZE} />,
        slug: '/memos',
    },
];

interface NavItemProps extends React.HTMLAttributes<HTMLButtonElement> {
    isActive?: boolean;
}
function NavItem ({isActive, children, className, ...props}: NavItemProps) {
    return(
        <Button 
            className={`${isActive ? 'bg-slate-300 dark:bg-slate-700' : 'bg-transparent' }`}
            {...props}
        >
            {children}
        </Button>
    )
}

function Navbar() {
    const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);
    return (
        <nav className='h-full flex p-3 flex-col items-center justify-between select-none'>
            <div className='flex flex-1 flex-col gap-4'>
                {navItems.map((item) => (
                    <NavLink key={`nav-${item.name}`} to={item.slug}>
                        {({ isActive }) => (
                            <NavItem isActive={isActive} children={item.icon} />
                        )}
                    </NavLink>
                ))}
            </div>
            <div className='flex flex-col gap-4'>
                <Button onClick={toggleDarkMode}>
                    {isDarkMode ? <MdDarkMode size={ICON_SIZE} /> : <MdLightMode size={ICON_SIZE} />}
                </Button>
                <Link to="/logout">
                    <NavItem children={<MdLogout size={ICON_SIZE} />} />
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
