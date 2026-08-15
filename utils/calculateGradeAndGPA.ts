export type GradeResult = {
  letterGrade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'NG'
  gpa: number
  status: 'advanced' | 'proficient' | 'basic' | 'below'
}

export function calculateGradeAndGPA(percentage: number): GradeResult {
  if (!Number.isFinite(percentage) || percentage < 0) {
    return { letterGrade: 'NG', gpa: 0, status: 'below' }
  }

  if (percentage >= 90) return { letterGrade: 'A+', gpa: 4, status: 'advanced' }
  if (percentage >= 80) return { letterGrade: 'A', gpa: 3.6, status: 'advanced' }
  if (percentage >= 70) return { letterGrade: 'B+', gpa: 3.2, status: 'proficient' }
  if (percentage >= 60) return { letterGrade: 'B', gpa: 2.8, status: 'proficient' }
  if (percentage >= 50) return { letterGrade: 'C+', gpa: 2.4, status: 'basic' }
  if (percentage >= 40) return { letterGrade: 'C', gpa: 2, status: 'basic' }
  if (percentage >= 35) return { letterGrade: 'D', gpa: 1.6, status: 'below' }
  return { letterGrade: 'NG', gpa: 0, status: 'below' }
}

export function calculatePercentage(scores: number[], maxScore = 4) {
  const validScores = scores.filter((score) => Number.isFinite(score))
  if (!validScores.length) return 0
  return Math.round((validScores.reduce((sum, score) => sum + score, 0) / (maxScore * validScores.length)) * 100)
}

export function calculateOverallGPA(gpas: number[]) {
  if (!gpas.length) return 0
  return Math.round((gpas.reduce((sum, gpa) => sum + gpa, 0) / gpas.length) * 10) / 10
}
