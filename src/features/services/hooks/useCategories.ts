import { useEffect, useState } from "react";
import type { CategoryCreate, CategoryView } from "../types/services.types";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../service/category.service";

export const useGetCategories = () => {
    const [categories, setCategories] = useState<CategoryView[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = async () => {
        setError(null);
        setLoading(true);
        try {
            setCategories(await getCategories());
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCategories(); }, []);

    return { categories, loading, error, refresh: fetchCategories };
};

export const useCreateCategory = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const create = async (payload: CategoryCreate) => {
        setError(null);
        setLoading(true);
        try {
            await createCategory(payload);
            return true;
        } catch (err) {
            setError((err as Error).message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { create, error, loading };
};

export const useUpdateCategory = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const update = async (id: string, payload: Partial<CategoryCreate>) => {
        setError(null);
        setLoading(true);
        try {
            await updateCategory(id, payload);
            return true;
        } catch (err) {
            setError((err as Error).message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { update, error, loading };
};

export const useDeleteCategory = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const remove = async (id: string) => {
        setError(null);
        setLoading(true);
        try {
            await deleteCategory(id);
            return true;
        } catch (err) {
            setError((err as Error).message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { remove, error, loading };
};
