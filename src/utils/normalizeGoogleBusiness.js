export function normalizeGoogleBusiness(place) {

    return {
        name: place.title || null,
        category: place.categoryName || null,
        phone: place.phone || null,
        website: place.website || null,
        rating: place.totalScore || null,
        placeId: place.placeId || null
    };

}