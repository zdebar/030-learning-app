CREATE OR REPLACE FUNCTION public.get_math_practice(user_id UUID, practice_chapter_id INT)
RETURNS JSON AS $$
SELECT json_build_object(
  'exercise', (
    SELECT json_build_object(
      'exercise_id', e.id,
      'name', e.name,
      'type', e.type,
      'points', e.points,
      'content', e.content,
      'user_points_achieved', ue.points_achieved,
      'user_finished_at', ue.finished_at
    )
    FROM exercises e
    LEFT JOIN user_exercises ue
      ON ue.exercise_id = e.id AND ue.user_id = user_id
    WHERE e.chapter_id = practice_chapter_id
      AND ue.finished_at IS NULL
    ORDER BY e.position ASC
    LIMIT 1
  ),
  'explanation', (
    SELECT json_build_object(
      'explanation_id', ex.id,
      'name', ex.name,
      'content', ex.content
    )
    FROM chapters ch
    JOIN explanations ex ON ex.id = ch.explanation_id
    WHERE ch.id = practice_chapter_id
    LIMIT 1
  ),
  'user_progress', (
    SELECT json_build_object(
      'chapter_id', ch.id,
      'points_achieved', uc.points_achieved,
      'points_required', ch.points_required
    )
    FROM chapters ch
    LEFT JOIN user_chapters uc
      ON uc.chapter_id = ch.id AND uc.user_id = user_id
    WHERE ch.id = practice_chapter_id
    LIMIT 1
  )
);
$$ LANGUAGE SQL STABLE;