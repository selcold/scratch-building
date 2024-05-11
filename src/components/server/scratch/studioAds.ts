// /src/components/backend/scratch/studioAds.ts

"use server";

import axios from "axios";
import { studioAdConfig } from "../../../../scratchAds.config";

export interface ScratchStudioAdConfig {
  studio_id: number;
  check: true | false;
  filter?: null | StudioFilter;
}

export type StudioFilter = {
  min_views?: number;
  min_loves?: number;
  min_favorites?: number;
  min_remixes?: number;
};

export const fetchProjects = async (config: ScratchStudioAdConfig) => {
  try {
    const response = await axios.get(
      `https://api.scratch.mit.edu/studios/${config.studio_id}/projects`
    );
    const projects = response.data;
    return projects;
  } catch (error) {
    console.error(
      `Error fetching projects ( studio_id: ${config.studio_id} ):`,
      error
    );
    return [];
  }
};

export const fetchProject = async (project_id: number) => {
  try {
    const response = await axios.get(
      `https://api.scratch.mit.edu/projects/${project_id}`
    );
    const projects = response.data;
    return projects;
  } catch (error) {
    console.error(
      `Error fetching project ( project_id: ${project_id} ):`,
      error
    );
    return [];
  }
};

export const filterProjects = async (
  projects: any[],
  config: ScratchStudioAdConfig
): Promise<any[]> => {
  try {
    const filteredProjects: any[] = [];

    // プロジェクトごとに非同期でデータを取得し、フィルターを適用する
    await Promise.all(
      projects.map(async (project) => {
        const check = config.check;
        if (check) {
          const projectData = await fetchProject(project.id);

          // プロジェクトデータが取得できた場合のみフィルターを適用する
          if (projectData) {
            const stats = projectData.stats;
            const filter = config.filter || {};
            // プロジェクトにstatsプロパティが存在しない場合、フィルターを通過させない
            if (stats) {
              const passesFilter =
                (!filter.min_views || stats.views >= filter.min_views) &&
                (!filter.min_loves || stats.loves >= filter.min_loves) &&
                (!filter.min_favorites ||
                  stats.favorites >= filter.min_favorites) &&
                (!filter.min_remixes || stats.remixes >= filter.min_remixes);

              if (passesFilter) {
                filteredProjects.push(project); // ここで配列に追加する
              }
            }
          }
        } else {
          filteredProjects.push(project); // ここで配列に追加する
        }
      })
    );

    return filteredProjects; // 配列を返す
  } catch (error) {
    console.error(
      `ScratchAds filterProjects ( projects.length: ${projects.length} / studio_id: ${config.studio_id} ):`,
      error
    );
    throw error; // エラーが発生した場合はエラーをスローする
  }
};

export const ScratchStudioAd = async () => {
  const projects = await fetchProjects(studioAdConfig);
  const filteredProjects = await filterProjects(projects, studioAdConfig);

  const randomIndex = Math.floor(Math.random() * filteredProjects.length);
  const randomProject = filteredProjects[randomIndex];

  return randomProject;
};
