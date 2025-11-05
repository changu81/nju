import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
      {/* 부드러운 배경 빛 효과 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,255,255,0.15)_0%,transparent_70%)] blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(128,0,255,0.15)_0%,transparent_70%)] blur-3xl animate-pulse delay-1000" />
      </div>

      {/* 중앙 텍스트 */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="z-10 text-center text-7xl md:text-9xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-[0_0_25px_rgba(0,200,255,0.5)]"
      >
        내 전 업
      </motion.h1>

      {/* 하단 설명 텍스트 */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="z-10 absolute bottom-12 text-gray-300 text-lg tracking-widest"
      >
        ⚡ 내전 통계 & 밸런싱 시스템 ⚡
      </motion.div>

      {/* 은은한 흐르는 빛 효과 */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
        className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"
      />
    </div>
  );
}