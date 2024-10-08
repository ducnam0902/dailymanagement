import http from '@/lib/http'
import { CreateNoteDto, CurrentWeekType, NoteType } from '@/utils/formType';
import { ResponseStatus } from '@/utils/types';
type CustomOptions = Omit<RequestInit, 'method'>;

const noteApi = {
  createNote: async (noteData: CreateNoteDto ) => await http.post<ResponseStatus>('/note', noteData),
  getNoteByDate: async (date: string, options?: Omit<CustomOptions, 'body'>) => await http.get<NoteType[]>(`/note/${date}`, options),
  markNoteCompleted: async (noteId: number) => await http.put<NoteType>(`/note/${noteId}`),
  getNoteByWeek: async (currentWeek: CurrentWeekType) => await http.post<NoteType[]>('/note/getByWeek', currentWeek)
}

export default noteApi;