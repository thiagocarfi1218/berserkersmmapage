import { useState, useEffect, ReactNode } from "react";
import { 
  db, 
  auth, 
  collection, 
  onSnapshot, 
  query, 
  orderBy
} from "../lib/firebase";
import { motion, AnimatePresence } from "motion/react";
import { Camera } from "lucide-react";

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface Photo {
  id: string;
  url: string;
  caption: string;
  uploadedBy: string;
  createdAt: any;
}

export default function PhotoGallery({ children }: { children?: ReactNode }) {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const q = query(collection(db, "photos"), orderBy("createdAt", "desc"));
    const unsubscribePhotos = onSnapshot(q, (snapshot) => {
      const photoData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Photo[];
      setPhotos(photoData);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, "photos");
    });

    return () => {
      unsubscribePhotos();
    };
  }, []);

  return (
    <section id="gallery" className="py-24 md:py-40 bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {children}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-8xl font-black uppercase italic mb-4 tracking-tighter border-l-8 border-rose-600 pl-8">
              Gym Gallery
            </h2>
            <p className="text-zinc-500 font-bold uppercase tracking-widest italic ml-10">
              The Frontlines of Training
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {photos.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative aspect-square group bg-zinc-900 overflow-hidden border border-zinc-800"
              >
                <img 
                  src={photo.url} 
                  alt={photo.caption} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  {photo.caption && (
                    <p className="text-white font-black uppercase italic tracking-tighter text-lg leading-none mb-2">
                      {photo.caption}
                    </p>
                  )}
                  <p className="text-rose-600 text-[10px] uppercase font-black tracking-widest italic">
                    {photo.createdAt?.toDate().toLocaleDateString() || "Just now"}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {photos.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-zinc-800">
              <Camera className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
              <p className="text-zinc-600 uppercase font-black italic tracking-widest">No photos in the gallery yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
