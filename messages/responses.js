const express = require("express");

const RESPONSES = {
    OK: { status: 200, success: true, message: "Requête traitée avec succès" },
    CREATED: { status: 201, success: true, message: "Ressource créée avec succès" },

    BAD_REQUEST: { status: 400, success: false, message: "Données invalides ou manquantes" },
    UNAUTHORIZED: { status: 401, success: false, message: "Authentification requise" },
    FORBIDDEN: { status: 403, success: false, message: "Accès refusé" },
    NOT_FOUND: { status: 404, success: false, message: "Ressource introuvable" },
    CONFLICT: { status: 409, success: false, message: "Cette ressource existe déjà" },

    
    INTERNAL_SERVER_ERROR: { status: 500, success: false, message: "Erreur interne du serveur" }
};

module.exports = RESPONSES;