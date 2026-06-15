import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { firebaseAdminConfig } from "./env";

let adminApp: App | null = null;

function hasAdminCredentials(): boolean {
  return Boolean(
    firebaseAdminConfig.projectId &&
      firebaseAdminConfig.clientEmail &&
      firebaseAdminConfig.privateKey,
  );
}

export function isFirebaseAdminConfigured(): boolean {
  return hasAdminCredentials();
}

export function getAdminApp(): App | null {
  if (!hasAdminCredentials()) {
    return null;
  }

  if (adminApp) {
    return adminApp;
  }

  const existingApps = getApps();
  if (existingApps.length > 0) {
    adminApp = existingApps[0]!;
    return adminApp;
  }

  const projectId = firebaseAdminConfig.projectId!;
  const clientEmail = firebaseAdminConfig.clientEmail!;
  const privateKey = firebaseAdminConfig.privateKey!;

  adminApp = initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
    projectId,
  });

  return adminApp;
}

export function getAdminDb(): Firestore | null {
  const app = getAdminApp();
  if (!app) {
    return null;
  }

  return getFirestore(app);
}
