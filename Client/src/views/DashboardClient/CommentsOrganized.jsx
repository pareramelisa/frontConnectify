export async function getComments() {
    const response = await fetch('https://connectifyback-dp-production.up.railway.app/comments/');
    const comments = await response.json();

    // Imprime en consola la data de comments
    console.log("comments:", comments);

    const filteredComments = comments.filter(comment => !comment.isDeleted);
    const mappedComments = filteredComments.map(comment => ({
        id: comment.Client._id,
        client_id: comment.Client._id, // Agrega el campo client_id
        clientName: `${comment.Client.name} ${comment.Client.lastName}`,
        clientPhoto: comment.Client.image, // Agrega la foto del cliente
        comment: comment.comment,
        rating: comment.rating,
        professional_id: comment.Professional._id, // Agrega el campo professional_id
        professionalName: `${comment.Professional.name} ${comment.Professional.lastName} (${comment.Professional.profession})`,
        professionalPhoto: comment.Professional.image, // Agrega la foto del profesional
        date: new Date(comment.date).toLocaleDateString() // Agrega la fecha formateada
    }));

    // Imprime en consola la data de mappedComments
    console.log("mappedComments:", mappedComments);

    return mappedComments;
}
