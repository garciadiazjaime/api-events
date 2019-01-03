const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
} = require('graphql/type');

const EventModel = require('../../model/eventModel');

const eventType = new GraphQLObjectType({
  name: 'event',
  description: 'event event',
  fields: () => ({
    uuid: {
      type: GraphQLString,
      description: 'The id of the event.',
    },
    title: {
      type: GraphQLString,
      description: 'Events title',
    },
    description: {
      type: GraphQLString,
      description: 'Events description',
    },
    url: {
      type: GraphQLString,
      description: 'Events url',
    },
    image: {
      type: GraphQLString,
      description: 'Events image',
    },
    price: {
      type: GraphQLString,
      description: 'Events price',
    },
    date: {
      type: GraphQLString,
      description: 'Events date',
    },
    rawDate: {
      type: GraphQLString,
      description: 'Events original date value'
    }
  }),
});

const eventSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      event: {
        type: new GraphQLList(eventType),
        args: {
          uuid: {
            name: 'uuid',
            type: GraphQLString,
          },
        },
        resolve: (root, { uuid }) => {
          const foundEvents = new Promise((resolve, reject) => {
            const query = uuid ? { uuid } : {};
            EventModel.find(query, (error, events) => (error ? reject(error) : resolve(events))).sort('-date');
          });
          return foundEvents;
        },
      },
    },
  }),
});

module.exports = eventSchema;
