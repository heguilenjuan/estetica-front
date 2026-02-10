import './Avatar.style.css'
import defaultAvatar from '../../../assets/default.jpg'

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src?: string
    size?: number
    fallbackSrc?: string
}

export const Avatar = ({
    src,
    alt = '',
    size = 35,
    fallbackSrc = defaultAvatar,
    className,
    ...imgProps
}: AvatarProps) => {
    return (
        <img
            src={src ?? fallbackSrc}
            alt={alt}
            width={size}
            height={size}
            className={`avatar-image ${className ?? ''}`}
            loading="lazy"
            decoding="async"
            onError={(e) => {
                e.currentTarget.src = fallbackSrc
            }}
            {...imgProps}
        />
    )
}
