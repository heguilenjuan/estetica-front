import { useEffect, useState } from "react";
import type { TreatmentCreate, TreatmentView } from "../types/services.types";
import { createTreatment, deleteTreatment, getTreatments, updateTreatment } from "../service/treatment.service";

export const useGetTreatments = () => {
    const [treatments, setTreatments] = useState<TreatmentView[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTreatments = async () => {
        setError(null);
        setLoading(true);
        try {
            setTreatments(await getTreatments());
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchTreatments(); }, []);

    return { treatments, loading, error, refresh: fetchTreatments };
};

export const useCreateTreatment = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const create = async (payload: TreatmentCreate) => {
        setError(null);
        setLoading(true);
        try {
            await createTreatment(payload);
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

export const useUpdateTreatment = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const update = async (id: string, payload: Partial<TreatmentCreate>) => {
        setError(null);
        setLoading(true);
        try {
            await updateTreatment(id, payload);
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

export const useDeleteTreatment = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const remove = async (id: string) => {
        setError(null);
        setLoading(true);
        try {
            await deleteTreatment(id);
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
