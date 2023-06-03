import clientPromise from '../../../db/connection.ts';


export default async function addData(colllection, id, data) {
    const db = await clientPromise
    let result = null;
    let error = null;

    try {
        result = await db.collection(colllection).findByIdAndUpdate(id, data);
    } catch (e) {
        error = e;
    }

    return { result, error };
}