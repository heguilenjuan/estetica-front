import type { ReactNode } from "react";
import { useId } from "react";
import '../input/Input.style.css';

interface SearchInputProps<T> {
    label?: string;
    loading?: boolean;
    results: T[];
    onSearch: (query: string) => void;
    renderItem: (item: T) => ReactNode;
    placeholder?: string;
    className?: string;
    value?: string;
}

export const SearchInput = <T,>({
    label,
    loading = false,
    results,
    onSearch,
    renderItem,
    placeholder,
    className,
    value
}: SearchInputProps<T>) => {

    const inputId = useId()
    const listBoxId = useId();

    return (
        <div role="search" className={`input-box ${className ?? ''}`}>
            <label>{label}</label>
            <input
                className='input-input'
                id={inputId}
                type="search"
                role="combobox"
                placeholder={placeholder}
                aria-expanded={results.length > 0}
                aria-controls={listBoxId}
                aria-autocomplete="list"
                autoComplete="off"
                onChange={e => onSearch(e.target.value)}
                value={value ?? ''}
            />
            {
                loading && (
                    <span aria-live="polite" aria-label="Buscando ..."></span>
                )
            }
            {results.length !== 0 &&


                <ul id={listBoxId} role="listbox" aria-label={label} className="search-results">
                    {results.map((item, index) => (
                        <li
                            key={index}
                            role="option"
                            aria-selected={false}
                        >
                            {renderItem(item)}
                        </li>
                    ))}

                </ul>
            }
        </div>
    )
}

