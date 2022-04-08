export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '6250846d7e9f4e008043c45d',
                  title: 'Sanity Studio',
                  name: 'art-deco-doesburg-studio',
                  apiId: '40d80ec9-b320-46ea-a0a1-3c4c074c1e69'
                },
                {
                  buildHookId: '6250846d8981640085b2137f',
                  title: 'Portfolio Website',
                  name: 'art-deco-doesburg',
                  apiId: 'f4bd8f72-bf8f-432e-8fe3-c06f29243138'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/krisstallenberg/art-deco-doesburg',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://art-deco-doesburg.netlify.app',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['sampleProject']},
      layout: {width: 'medium'}
    }
  ]
}
