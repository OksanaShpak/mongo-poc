const { ObjectId } = require('mongodb');


const initCRUD = (contactsCollection) => {

  return {
    create: async (contact) => {
      return contactsCollection.insertOne(contact);
    },
    read: async (id = '') => {
      if (id) {
        if (typeof id === 'string') id = new ObjectId(id);

        return contactsCollection.findOne({ _id: id });
      }

      const contacts = await contactsCollection.find().toArray();
      contacts.forEach(contact => {
        contact.id = contact._id.toString();
        delete contact._id;
      });

      return contacts;
    },
    update: async (id, contact) => {
      if (typeof id === 'string') id = new ObjectId(id);

      return contactsCollection.updateOne({ _id: id }, { $set: contact });
    },
    dremove: async (id) => {
      if (typeof id === 'string') id = new ObjectId(id);

      return contactsCollection.deleteOne({ _id: id });
    }
  };
}
exports.initCRUD = initCRUD;