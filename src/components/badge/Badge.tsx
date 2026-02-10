import './Badge.style.css'

type BadgeStatus = 'canceled' | 'pending' | 'inProgress' | 'finished';

interface BadgeProps {
    status?: BadgeStatus;
    children: string;
}

export const Badge = ({
    status = 'inProgress',
    children,
}: BadgeProps) => {
    return (
        <span className={`badge badge-${status}`}>
            {children}
        </span>
    );
};
