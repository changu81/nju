import { motion } from 'framer-motion';
export default function Home() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black relative overflow-hidden">
      {/* 배경 반짝이 효과 */}
      <div className="absolute inset-0">
        <div className="w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] animate-pulse opacity-40" />
      </div>

      {/* 중심 텍스트 */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-8xl md:text-9xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-[0_0_20px_rgba(0,0,255,0.4)]"
      >
        내 전 업
      </motion.h1>

      {/* 하단 빛 효과 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 text-gray-400 text-sm tracking-widest"
      >
        ⚡ 내전 통계 시스템 ⚡
      </motion.div>
    </div>
  );
}