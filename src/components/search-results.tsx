
"use client";

import { useState, useEffect, useMemo } from 'react';
import type { Session, Subject, ImportantUpdate, ApexUpdate } from '@/lib/data';
import type { FilterType, SortType, SubjectFilterType } from './dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Badge } from './ui/badge';

interface SearchResultsProps {
  query: string;
  filter: FilterType;
  subjectFilter: SubjectFilterType;
  sort: SortType;
}

type SearchableItem = 
  | { type: 'session'; data: Session; date: Date }
  | { type: 'update'; data: ImportantUpdate | ApexUpdate; date: Date }
  | { type: 'subject'; data: Subject; date: null };


export function SearchResults({ query, filter, subjectFilter, sort }: SearchResultsProps) {
  const [items, setItems] = useState<SearchableItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const { getSubjects, getCurrentSessions, getImportantUpdates, getApexUpdates } = await import('@/lib/dynamic-data');
      const subjects = await getSubjects();
      const sessions = await getCurrentSessions();
      const importantUpdates = await getImportantUpdates();
      const apexUpdates = await getApexUpdates();

      const now = new Date();
      const allItems: SearchableItem[] = [
        ...sessions.map(s => ({ type: 'session' as const, data: s, date: s.startTime })),
        ...importantUpdates.map(u => ({ type: 'update' as const, data: u, date: now })), // Use current date for updates
        ...apexUpdates.map(u => ({ type: 'update' as const, data: u, date: now })),
        ...subjects.map(s => ({ type: 'subject'as const, data: s, date: null })),
      ];
      setItems(allItems);
      setLoading(false);
    }
    loadData();
  }, []);

  const subjectIdMap: Record<string, SubjectFilterType> = {
    "Data Visualization and Storytelling": "dvs",
    "Feature Engineering": "fe",
    "Feature Engineering- Week 3 Rescheduled": "fe",
    "Data Pre-processing": "dp",
    "Statistical Modelling and Inferencing": "smi",
    "Data Stores and Pipelines": "dsp",
    "Advanced Apex Project I": "aap",
  };
  
  const filteredItems = useMemo(() => {
    const lowercasedQuery = query.toLowerCase();
    
    return items
      .filter(item => {
        // Type Filter
        if (filter !== 'all' && item.type !== filter) {
          return false;
        }

        // Subject Filter
        if (subjectFilter !== 'all') {
          if (item.type === 'session' && subjectIdMap[item.data.subject] !== subjectFilter) {
            return false;
          }
          if (item.type === 'subject' && item.data.id !== subjectFilter) {
            return false;
          }
           if (item.type === 'update') { 
            // A simple check if the subject acronym appears in the update title.
             if (!item.data.title.toLowerCase().includes(subjectFilter)) {
                return false;
             }
           }
        }

        // Query Filter
        const searchableText = 
            item.type === 'session' ? `${item.data.title} ${item.data.subject}` :
            item.type === 'update' ? `${item.data.title} ${item.data.description}` :
            `${item.data.name} ${item.data.evaluationCriteria}`;
        
        return searchableText.toLowerCase().includes(lowercasedQuery);
      })
      .sort((a, b) => {
        if (sort === 'date-desc') {
          if (!a.date) return 1;
          if (!b.date) return -1;
          return b.date.getTime() - a.date.getTime();
        }
        if (sort === 'date-asc') {
          if (!a.date) return 1;
          if (!b.date) return -1;
          return a.date.getTime() - b.date.getTime();
        }
        // Basic relevance: query appears in title is better
        const aTitleMatch = (item: SearchableItem) => {
          const title = 'title' in item.data ? item.data.title : 'name' in item.data ? item.data.name : '';
          return title.toLowerCase().includes(lowercasedQuery) ? -1 : 1;
        };
        return aTitleMatch(a) - aTitleMatch(b);
      });
  }, [query, filter, subjectFilter, sort, items]);

  if (loading) {
    return <div className="text-center text-muted-foreground">Loading search results...</div>;
  }

  if (filteredItems.length === 0) {
    return <div className="text-center text-muted-foreground py-12">No results found for &quot;{query}&quot;. Try a different search.</div>;
  }
  
  return (
    <div className="space-y-4">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredItems.map(item => (
          <motion.div
            key={`${item.type}-${item.data.id}`}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
             <Card className="h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-headline">{ 'title' in item.data ? item.data.title : item.data.name }</CardTitle>
                    <Badge variant={
                      item.type === 'session' ? 'default' :
                      item.type === 'update' ? 'secondary' :
                      'outline'
                    }>{item.type}</Badge>
                  </div>
                  {item.type === 'session' && (
                    <CardDescription>{format(item.data.startTime, "eee, MMM d 'at' h:mm a")}</CardDescription>
                  )}
                   {item.type === 'update' && (
                     <CardDescription dangerouslySetInnerHTML={{ __html: item.data.description.substring(0, 100) + '...' }} />
                   )}
                   {item.type === 'subject' && (
                     <CardDescription>{item.data.evaluationCriteria?.substring(0, 100) + '...'}</CardDescription>
                   )}
                </CardHeader>
                <CardContent>
                  {/* Additional details can be added here if needed */}
                </CardContent>
             </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
