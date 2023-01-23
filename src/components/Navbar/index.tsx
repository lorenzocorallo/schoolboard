import { Link, NavLink } from 'react-router-dom';
import { IoHome, IoSchool } from 'react-icons/io5';
import { MdAssignment, MdLogout, MdPushPin } from 'react-icons/md'
import Button from '../Button';

const ICON_SIZE = 24;
const navItems = [
    {
        name: 'Dashboard',
        icon: <IoHome size={ICON_SIZE} />,
        slug: 'dashboard'
    },
    {
        name: 'Voti',
        icon: <IoSchool size={ICON_SIZE} />,
        slug: 'marks',
    },
    {
        name: 'Compiti',
        icon: <MdAssignment size={ICON_SIZE} />,
        slug: 'homeworks',
    },
    {
        name: 'Promemoria',
        icon: <MdPushPin size={ICON_SIZE} />,
        slug: 'memos',
    },
];

interface NavItemProps extends React.HTMLAttributes<HTMLButtonElement> {
    isActive?: boolean;
}
const NavItem = ({isActive, children, className, ...props}: NavItemProps) => {
    return(
        <Button 
            className={`${isActive ? 'bg-blue-300 dark:bg-slate-700' : 'bg-transparent' }`}
            {...props}
        >
            {children}
        </Button>
    )
}

const Navbar = () => {
    return (
        <nav className='h-full flex p-3 flex-col items-center justify-between select-none'>
            <div className='flex flex-col gap-4'>

                {navItems.map((item) => (
                    <NavLink key={`nav-${item.name}`} to={`/${item.slug}`}>
                        {({isActive}) => (
                            <NavItem isActive={isActive} children={item.icon} />
                        )}
                    </NavLink>
                ))}
            </div>
            <Link to="/logout">
                <NavItem children={<MdLogout size={ICON_SIZE} />} />
            </Link>
        </nav>
    );
};

export default Navbar;
